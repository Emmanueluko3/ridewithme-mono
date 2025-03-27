import type { PropsWithChildren } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { ThemedView } from "@/components/ThemedView";
type Props = PropsWithChildren<{
  style?: ViewStyle;
}>;

export default function DefaultView({ style, children }: Props) {
  return (
    <ThemedView
      style={[styles.container, { padding: style?.padding ?? 10 }, style]}
    >
      <ThemedView style={styles.content}>{children}</ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    gap: 16,
    overflow: "hidden",
  },
});
