function Spacing(props: { size: number }) {
  return (
    <div
      style={{ width: "100%", height: props.size + "px", flexShrink: 0 }}
    ></div>
  );
}

export default Spacing;
