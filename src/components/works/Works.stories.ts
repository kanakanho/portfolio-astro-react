import type { Meta, StoryObj } from "@storybook/react-vite";
import Works from "./Works";

const meta: Meta<typeof Works> = {
  component: Works,
};

export default meta;
type Story = StoryObj<typeof Works>;

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
