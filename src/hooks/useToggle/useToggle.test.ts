import { renderHook, act } from "@testing-library/react-hooks";
import { useToggle } from "./useToggle";

// NOTE: There's a gotcha with updates.
// renderHook mutates the value of current when updates happen so you cannot destructure its values
// as the assignment will make a copy locking into the value at that time.

it("should be initialized with false if no argument is provided", () => {
  const { result } = renderHook(() => useToggle());

  expect(result.current.isActive).toBe(false);
});

it("should be initialized with initial value", () => {
  const { result } = renderHook(() => useToggle(true));

  expect(result.current.isActive).toBe(true);
});

it("should be toggled", () => {
  const { result } = renderHook(() => useToggle());

  act(() => result.current.onToggle());
  expect(result.current.isActive).toBe(true);
});

it("should be set on", () => {
  const { result } = renderHook(() => useToggle());

  act(() => result.current.setOn());
  expect(result.current.isActive).toBe(true);
});

it("should be set off", () => {
  const { result } = renderHook(() => useToggle(true));

  act(() => result.current.setOff());
  expect(result.current.isActive).toBe(false);
});

it("should be reset", () => {
  const { result } = renderHook(() => useToggle(true));

  act(() => {
    result.current.setOff();
    result.current.onReset();
  });
  expect(result.current.isActive).toBe(true);
});

it("should reset isActive to updated initial value", () => {
  const { result, rerender } = renderHook(
    ({ initialValue }) => useToggle(initialValue),
    {
      initialProps: { initialValue: false },
    }
  );

  rerender({ initialValue: true });
  act(() => result.current.onReset());
  expect(result.current.isActive).toBe(true);
});
