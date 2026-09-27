import { ExternalLink, GitBranch } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EventRegistrationFormProps {
  eventTitle: string;
  disabled?: boolean;
}

export function EventRegistrationForm({ eventTitle, disabled = false }: EventRegistrationFormProps) {
  const discussionUrl = `https://github.com/NKUGeek/community/discussions/new?category=events&title=${encodeURIComponent(eventTitle)}`;

  return (
    <div className="mt-4 border-t border-zinc-200 pt-4">
      <p className="text-sm leading-6 text-zinc-600">
        {disabled ? "当前活动名额已满，可在 GitHub 讨论中关注候补消息。" : "活动报名与问题统一在 GitHub Discussions 中公开记录。"}
      </p>
      <Button className="mt-3 bg-[#7a1731] text-white hover:bg-[#641228]" asChild>
        <a href={discussionUrl} target="_blank" rel="noreferrer">
          <GitBranch className="mr-2 h-4 w-4" />
          {disabled ? "关注活动动态" : "前往报名讨论"}
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  );
}
