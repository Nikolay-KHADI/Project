import { useEffect, useRef, useState } from "react";


export function TooltipElement(props) {
  const { left, parentWidth, top, tooltip } = props.params;
  const [coordLeft, setCoordLeft] = useState(null);
  const [coordTop, setCoordTop] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    setCoordLeft(left + (parentWidth - ref.current.offsetWidth) / 2);
    setCoordTop(top - ref.current.offsetHeight - 12);
  }, [])

  return (
    <div className="tooltip-container"
      style={{
        position: "fixed",
        left: `${coordLeft}px`,
        top: `${coordTop}px`,
        padding: "5px",
        backgroundColor: "#fff"
      }}>
      <div className="tooltip"
        ref={ref}
      >
        {tooltip}
      </div>
    </div>
  )
}
