import { useEffect, useState } from "react";
import { useInView } from "./useInView";

interface Props {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedCounter({ target, suffix = "", prefix = "", duration = 1800, className, style }: Props) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.3);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  const display = target >= 1000 ? value.toLocaleString() : value;

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{display}{suffix}
    </span>
  );
}
