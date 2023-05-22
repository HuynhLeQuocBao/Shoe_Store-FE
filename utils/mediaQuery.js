import { useMediaQuery } from "hooks/useMediaQuery";

export const useIsSmall = () => useMediaQuery("(min-width: 640px)");
export const useIsMedium = () => useMediaQuery("(min-width: 768px)");
