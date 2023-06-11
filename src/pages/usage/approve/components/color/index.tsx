import React, { useState } from "react";
 import { ColorPicker } from './ColorPicker'

export default function PopoverPicker() {
  const [color, setColor] = useState("#aabbcc");

  return <ColorPicker color={color} onChange={setColor} />;
}
