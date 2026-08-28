"use client";
import { useEffect, useRef } from "react";
export function CursorOrbit(){
  const dot=useRef<HTMLDivElement>(null);const ring=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(matchMedia("(pointer: coarse)").matches||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y,raf=0;
    const move=(e:PointerEvent)=>{x=e.clientX;y=e.clientY;if(dot.current)dot.current.style.transform=`translate3d(${x}px,${y}px,0)`};
    const tick=()=>{rx+=(x-rx)*.16;ry+=(y-ry)*.16;if(ring.current)ring.current.style.transform=`translate3d(${rx}px,${ry}px,0)`;raf=requestAnimationFrame(tick)};
    const enter=(e:Event)=>{const t=e.target as HTMLElement;if(t.closest("a,button"))ring.current?.classList.add("isActive")};
    const leave=(e:Event)=>{const t=e.target as HTMLElement;if(t.closest("a,button"))ring.current?.classList.remove("isActive")};
    addEventListener("pointermove",move,{passive:true});document.addEventListener("pointerover",enter);document.addEventListener("pointerout",leave);raf=requestAnimationFrame(tick);
    return()=>{removeEventListener("pointermove",move);document.removeEventListener("pointerover",enter);document.removeEventListener("pointerout",leave);cancelAnimationFrame(raf)};
  },[]);
  return <div className="cursorLayer" aria-hidden="true"><div ref={dot} className="cursorDot"/><div ref={ring} className="cursorRing"/></div>
}
