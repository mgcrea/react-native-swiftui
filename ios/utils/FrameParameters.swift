struct FrameParameters {
  var width: CGFloat? = nil
  var minWidth: CGFloat? = nil
  var maxWidth: CGFloat? = nil
  var height: CGFloat? = nil
  var minHeight: CGFloat? = nil
  var maxHeight: CGFloat? = nil
}

func computeFrameParameters(from style: StyleProps) -> FrameParameters {
  var params = FrameParameters()

  // Handle width
  if let width = style.width {
    switch width {
    case let .finite(value):
      params.width = value
    case let .percentage(fraction):
      if fraction == 1.0 {
        params.width = .infinity
      }
    }
  }

  // Handle height
  if let height = style.height {
    switch height {
    case let .finite(value):
      params.height = value
    case let .percentage(fraction):
      if fraction == 1.0 {
        params.height = .infinity
      }
    }
  }

  // Handle maxWidth
  if let maxWidth = style.maxWidth {
    switch maxWidth {
    case let .finite(value):
      params.maxWidth = value
    case let .percentage(fraction):
      if fraction == 1.0 {
        params.maxWidth = .infinity
      }
    }
  }

  // Handle maxHeight
  if let maxHeight = style.maxHeight {
    switch maxHeight {
    case let .finite(value):
      params.maxHeight = value
    case let .percentage(fraction):
      if fraction == 1.0 {
        params.maxHeight = .infinity
      }
    }
  }

  // Handle minWidth
  if let minWidth = style.minWidth {
    switch minWidth {
    case let .finite(value):
      params.minWidth = value
    case let .percentage(fraction):
      if fraction == 1.0 {
        params.minWidth = .infinity
      }
    }
  }

  // Handle minHeight
  if let minHeight = style.minHeight {
    switch minHeight {
    case let .finite(value):
      params.minHeight = value
    case let .percentage(fraction):
      if fraction == 1.0 {
        params.minHeight = .infinity
      }
    }
  }

  return params
}
