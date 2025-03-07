#!/bin/bash

# Default directory is current directory if not provided
DIR=${1:-.}
# Output file (default or provided as second argument)
OUTPUT_FILE=${2:-tmp/llm_project_input.yaml}
# Temporary files
TEMP_FILE=$(mktemp)
TEMP_PATHS=$(mktemp)

# Blacklist and whitelist patterns
BLACKLIST=("pnpm-lock.yaml" "example" "scripts")
WHITELIST=("example/src")

# Ensure output directory exists
mkdir -p "$(dirname "$OUTPUT_FILE")"

# Generate tree output in JSON format
tree -J -if --noreport --dirsfirst --prune --gitignore "$DIR" > "$TEMP_FILE"

# Function to check if a file should be included
should_include() {
    local filepath="$1"
    blacklisted=false
    for bl_pattern in "${BLACKLIST[@]}"; do
        if [[ "$filepath" == *"$bl_pattern"* ]]; then
            blacklisted=true
            break
        fi
    done
    whitelisted=false
    for wl_pattern in "${WHITELIST[@]}"; do
        if [[ "$filepath" == *"$wl_pattern"* ]]; then
            whitelisted=true
            break
        fi
    done
    [ "$blacklisted" = false ] || [ "$whitelisted" = true ]
}

# Start building the YAML
PACKAGE_JSON="$DIR/package.json"
if [ -f "$PACKAGE_JSON" ] && [ -r "$PACKAGE_JSON" ]; then
    NAME=$(jq -r '.name // "unknown"' "$PACKAGE_JSON")
    DESCRIPTION=$(jq -r '.description // "No description available"' "$PACKAGE_JSON")
    echo "name: \"$NAME\"" > "$OUTPUT_FILE"
    echo "description: \"$DESCRIPTION\"" >> "$OUTPUT_FILE"
else
    echo "name: \"unknown\"" > "$OUTPUT_FILE"
    echo "description: \"No package.json found\"" >> "$OUTPUT_FILE"
fi

GIT_LOG=$(git log -100 --pretty=format:"%h %ad %s" --date=short | uniq | sed 's/^/  /')
echo "git_log: |" >> "$OUTPUT_FILE"
echo "$GIT_LOG" >> "$OUTPUT_FILE"

# Add tree section
echo "tree: |" >> "$OUTPUT_FILE"

# Collect filtered paths and separate README
declare -a OTHER_PATHS
readme_path=""
while read -r filepath; do
    if [ -f "$filepath" ] && [ -r "$filepath" ] && should_include "$filepath"; then
        echo "$filepath" >> "$TEMP_PATHS"
        if [ "$filepath" = "./README.md" ]; then
            readme_path="$filepath"
        else
            OTHER_PATHS+=("$filepath")
        fi
    fi
done < <(jq -r '.[] | recurse(.contents[]?) | select(.type=="file") | .name' "$TEMP_FILE")

# Write tree
tree --fromfile "$TEMP_PATHS" --noreport --dirsfirst --prune --gitignore | sed '/tmp\.[^[:space:]]\+$/d' | sed 's/^/  /' >> "$OUTPUT_FILE"

# Write files, README first
echo -e "\nfiles:" >> "$OUTPUT_FILE"
if [ -n "$readme_path" ]; then
    echo "  - name: \"$readme_path\"" >> "$OUTPUT_FILE"
    echo "    content: |" >> "$OUTPUT_FILE"
    sed 's/^/      /' "$readme_path" >> "$OUTPUT_FILE"
fi
for filepath in "${OTHER_PATHS[@]}"; do
    echo "  - name: \"$filepath\"" >> "$OUTPUT_FILE"
    echo "    content: |" >> "$OUTPUT_FILE"
    sed 's/^/      /' "$filepath" >> "$OUTPUT_FILE"
done

# Clean up temporary files
rm "$TEMP_FILE" "$TEMP_PATHS"
echo "YAML file created: $OUTPUT_FILE"
echo "Hi, I’d like your assistance with a coding project I’m working on. To get you up to speed, I’ve attached a YAML file outlining the project, its file structure, and the contents of each file. Could you review it and let me know how you can help with development, debugging, or any other suggestions?"