import { useReducer } from "react";

function toggleReducer(state, action) {
  switch (action.type) {
    case useToggle.types.toggle: {
      return { on: !state.on };
    }
    case useToggle.types.on: {
      return { on: true };
    }
    case useToggle.types.off: {
      return { on: false };
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

function useToggle(
  initialValue = false,
  { reducer = (s, a) => a.changes } = {}
) {
  const [{ on }, dispatch] = useReducer(
    (state, action) => {
      const changes = toggleReducer(state, action);
      return reducer(state, { ...action, changes });
    },
    { on: initialValue }
  );

  const toggle = () => dispatch({ type: useToggle.types.toggle });
  const setOn = () => dispatch({ type: useToggle.types.on });
  const setOff = () => dispatch({ type: useToggle.types.off });
  return { on, toggle, setOn, setOff };
}

useToggle.types = {
  toggle: "TOGGLE",
  on: "ON",
  off: "OFF"
};

export default useToggle;
