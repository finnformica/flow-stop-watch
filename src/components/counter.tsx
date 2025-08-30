import { motion, MotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

import styles from "@/styles/counter.module.css";

function Number({
  mv,
  number,
  height,
}: {
  mv: MotionValue<number>;
  number: number;
  height: number;
}) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });
  return (
    <motion.span className={styles.counterNumber} style={{ y }}>
      {number}
    </motion.span>
  );
}

function Digit({
  place,
  value,
  height,
  digitStyle,
}: {
  place: number;
  value: number;
  height: number;
  digitStyle: React.CSSProperties;
}) {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div className={styles.counterDigit} style={{ height, ...digitStyle }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

export default function Counter({
  value,
  fontSize = 100,
  padding = 0,
  places = [100, 10, 1],
  gap = 8,
  borderRadius = 4,
  horizontalPadding = 8,
  textColor = "white",
  fontWeight = "bold",
  containerStyle,
  counterStyle,
  digitStyle,
  gradientHeight = 16,
  gradientFrom = "black",
  gradientTo = "transparent",
  topGradientStyle,
  bottomGradientStyle,
}: {
  value: number;
  fontSize: number;
  padding: number;
  places: number[];
  gap: number;
  borderRadius: number;
  horizontalPadding: number;
  textColor: string;
  fontWeight: string;
  containerStyle: React.CSSProperties;
  counterStyle: React.CSSProperties;
  digitStyle: React.CSSProperties;
  gradientHeight: number;
  gradientFrom: string;
  gradientTo: string;
  topGradientStyle: React.CSSProperties;
  bottomGradientStyle: React.CSSProperties;
}) {
  const height = fontSize + padding;
  const defaultCounterStyle = {
    fontSize,
    gap: gap,
    borderRadius: borderRadius,
    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding,
    color: textColor,
    fontWeight: fontWeight,
  };

  const defaultTopGradientStyle = {
    height: gradientHeight,
    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
  };

  const defaultBottomGradientStyle = {
    height: gradientHeight,
    background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
  };

  return (
    <div className={styles.counterContainer} style={containerStyle}>
      <div
        className={styles.counterCounter}
        style={{ ...defaultCounterStyle, ...counterStyle }}
      >
        {places.map((place) => (
          <Digit
            key={place}
            place={place}
            value={value}
            height={height}
            digitStyle={digitStyle}
          />
        ))}
      </div>
      <div className={styles.gradientContainer}>
        <div
          className={styles.topGradient}
          style={topGradientStyle ? topGradientStyle : defaultTopGradientStyle}
        ></div>
        <div
          className={styles.bottomGradient}
          style={
            bottomGradientStyle
              ? bottomGradientStyle
              : defaultBottomGradientStyle
          }
        ></div>
      </div>
    </div>
  );
}
