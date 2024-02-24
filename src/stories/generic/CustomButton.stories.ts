import type { Meta, StoryObj } from "@storybook/react";

import { CustomButton } from "components/generic";

const meta = {
  title: "Generic/CustomButton",
  component: CustomButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  argTypes: {
    text: {
      description: "Button text",
      control: {
        type: "text",
      },
    },
    type: {
      description: "Button type",
      control: {
        type: "select",
        options: ["button", "submit"],
      },
    },
    className: {
      description: "Button class name",
      control: {
        type: "text",
      },
    },
    onClick: {
      description: "Button click handler",
      control: {
        type: "function",
      },
    },
    leftIcon: {
      description: "Button left icon url",
      control: {
        type: "text",
      },
    },
    rightIcon: {
      description: "Button right icon url",
      control: {
        type: "text",
      },
    },
    isDisabled: {
      description: "Button is disabled",
      control: {
        type: "boolean",
      },
    },
    variant: {
      description: "Button variant color",
      control: {
        type: "select",
        options: ["info", "neutral", "success", "warning", "danger"],
      },
    },
  },
} satisfies Meta<typeof CustomButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Button",
    type: "button",
    className: "",
    onClick: () => {},
    leftIcon: "",
    rightIcon: "",
    isDisabled: false,
    variant: "info",
  },
};

export const WithLeftIcon: Story = {
  args: {
    text: "Button",
    type: "button",
    className: "",
    onClick: () => {},
    leftIcon: "/assets/icons/google.svg",
    rightIcon: "",
    isDisabled: false,
    variant: "neutral",
  },
};

export const WithRightIcon: Story = {
  args: {
    text: "Button",
    type: "button",
    className: "",
    onClick: () => {},
    leftIcon: "",
    rightIcon: "/assets/icons/google.svg",
    isDisabled: false,
    variant: "neutral",
  },
};
