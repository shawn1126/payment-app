import type { Meta, StoryObj } from "@storybook/react";

import { BottomNavigtion } from "components/generic";

const CustomBottomNavigation = () => {
  return (
    <div className="relative min-w-[350px] min-h-[100px] max-w-[400px]">
      <BottomNavigtion />
    </div>
  );
};

const meta = {
  title: "Generic/BottomNavigation",
  component: CustomBottomNavigation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  argTypes: {},
} satisfies Meta<typeof CustomBottomNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BottomNavigation: Story = {
  args: {},
};
