export const selectStyles = (errors) => ({
  control: (provided, state) => ({
    ...provided,
    borderColor: errors ? "red" : "#006d54",
    boxShadow: state.isFocused
      ? "0 0 0 1px " + (errors ? "red" : "#006d54")
      : provided.boxShadow,
  }),
});
