import React, { Children, useEffect, useRef, useState } from 'react'

export function DropDown(props) {

  const { left, parentHeight, top } = props.params;

  let [coordTop, setCoordTop] = useState(top + parentHeight + 5);
  const [coordLeft, setCoordLeft] = useState(left);
  const ref = useRef(null);

  // const dropDownHeight = ref.current.offsetHeight;

  // setCoordTop(top + parentHeight + 5);
  // setCoordLeft(left);

  useEffect(() => {
    const dropDownHeight = ref.current.offsetHeight;
    // let coordTop = top + parentHeight + 5;
    if (coordTop + dropDownHeight > window.innerHeight) {
      coordTop = top - dropDownHeight - 5;
    }
    setCoordTop(coordTop);
    // setCoordLeft(left);
  }, [])

  // useEffect(() => {
  //   const dropDownHeight = ref.current.offsetHeight;
  //   let coordTop = top + parentHeight + 5;
  //   if (coordTop + dropDownHeight > window.innerHeight) {
  //     coordTop = top - dropDownHeight - 5;
  //   }
  //   setCoordTop(coordTop);
  //   setCoordLeft(left);
  // }, [])

  // console.log(new Date());
  console.log( Date.now());


  return (
    <div className='dropDown'
      ref={ref}
      style={{
        // position: "fixed",
        top: `${coordTop}px`,
        left: `${coordLeft}px`,
      }}>
      <div
        className='dropDownOverlay'
        onClick={props.closeDropDown}
      >        
      </div>{props.children}</div>
  )
}
