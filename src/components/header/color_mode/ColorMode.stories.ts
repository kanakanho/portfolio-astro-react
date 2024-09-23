import type { Meta, StoryObj } from "@storybook/react";
import ColorMode from "./ColorMode";

const meta: Meta<typeof ColorMode> = {
  component: ColorMode,
};

export default meta;
type Story = StoryObj<typeof ColorMode>;

export const Primary: Story = {
  args: {},
};
