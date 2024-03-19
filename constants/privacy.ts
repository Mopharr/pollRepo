type Privacy = {
  id: string;
  title: string;
  description: string;
  url: string;
};

export const privacy: Privacy[] = [
  {
    id: "p1",
    title: "Voting Options",
    description:
      "At PollRepo, we respect your privacy and offer flexibility in how your votes are shared. You can choose to cast votes anonymously or set them to be publicly visible, depending on your personal settings. This ensures you have control over your privacy while engaging with polls.",
    url: "/viewable",
  },
  {
    id: "p2",
    title: "We collect some data about you",
    description:
      'Recognizing the enduring value of community contributions, PollRepo designates certain polls as "legacy polls." These polls, due to their significance, are retained even after the original creator\'s account deletion or upon their request for deletion. Legacy polls can be transferred to another user or managed by PollRepo, ensuring these valuable discussions remain accessible for community benefit.',
    url: "/collect",
  },
  {
    id: "p3",
    title: "Collaborative Polls Management",
    description:
      "In instances where the creator of a collaborative poll does not respond to suggested edits or in cases of dispute, PollRepo's community may intervene. This ensures collaborative polls reflect collective wisdom and maintain relevance, promoting a dynamic and respectful dialogue among users.",
    url: "/affiliates",
  },
  {
    id: "p4",
    title: "We Gather Some Information About You",
    description: "What We Collect & How",
    url: "/info",
  },
  {
    id: "p5",
    title: "We Utilize Your Data to Enhance PollRepo",
    description: "Find Out How We Use Your Information for Improvement",
    url: "/experience",
  },
  {
    id: "p6",
    title: "If You Have Questions About Our Data Use, Just Ask",
    description: "Find Out How to Reach Us",
    url: "/data-use",
  },
];
