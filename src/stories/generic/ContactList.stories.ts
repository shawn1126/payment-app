import type { Meta, StoryObj } from "@storybook/react";

import { ContactList } from "components/generic";

const meta = {
  title: "Generic/ContactList",
  component: ContactList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  argTypes: {
    open: {
      description: "Is the contact list open?",
      control: {
        type: "boolean",
      },
    },
  },
} satisfies Meta<typeof ContactList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
  },
};
