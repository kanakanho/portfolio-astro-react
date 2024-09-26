import type { Meta, StoryObj } from "@storybook/react";
import Imgs from "./Imgs";

const meta: Meta<typeof Imgs> = {
  component: Imgs,
};

export default meta;
type Story = StoryObj<typeof Imgs>;

export const Primary: Story = {
  args: {
    frontmatters: [
      {
        isActive: true,
        number: "34",
        title: "記事のタイトル",
        date: "2024/07/12",
        tags: ["event"],
        options: {
          description: "イベントの説明をここに記入します",
          website: "https://example.com/",
          image: "/default_img.png",
        },
        works: {
          worksDisplay: true,
          worksTitle: "項目のタイトル",
          worksDescription: "項目の説明をここに記入します",
          worksImage: "/default_img.png",
        },
      },
    ],
  },
};
