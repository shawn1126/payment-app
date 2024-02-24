import type { Meta, StoryObj } from "@storybook/react";

import { Divider } from "components/generic";

const meta = {
  title: "Generic/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  argTypes: {
    text: {
      description: "Text in the middle of divider",
      control: {
        type: "text",
      },
    },
    className: {
      description: "Divider componnet class name as whole",
      control: {
        type: "text",
      },
    },
    dividerClassName: {
      description: "Divider lines class name",
      control: {
        type: "text",
      },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "or",
    className: "min-w-40 h-4",
  },
};

export const WithoutText: Story = {
  args: {
    className: "min-w-40 h-4",
  },
};
