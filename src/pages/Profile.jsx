import { useParams } from "react-router";

const hobbies = [
  {
    id: 1,
    name: "Online Games",
    picture: "/games.jpg",
    description:
      "My favorite online game is Mobile Legends. I enjoy games that need teamwork, quick thinking, and strategy, and I like improving my skills every time I play.",
    reason:
      "I like online games because they help me relax after school and keep in touch with my friends. They also teach me teamwork, communication, and how to stay calm under pressure.",
  },
  {
    id: 2,
    name: "Jogging",
    picture: "/jogging.jfif",
    description:
      "Jogging around the neighborhood or at the park, usually in the morning or late afternoon. It's a simple way to stay active without needing any equipment.",
    reason:
      "I like jogging because it clears my mind and gives me energy for the day. It also helps me stay fit and build discipline.",
  },
  {
    id: 3,
    name: "Basketball",
    picture: "/basketball.avif",
    description:
      "Playing basketball with friends and classmates. I enjoy both casual games and friendly matches where we can practice shooting, passing, and teamwork.",
    reason:
      "I like basketball because it's fun, it keeps me active, and it helps me bond with my friends. It also teaches me teamwork and sportsmanship.",
  },
];

export default function Profile() {
  const { pk } = useParams();

  return (
    <div>
      {hobbies.map((hobby) => {
        if (hobby.id == pk) {
          return (
            <div
              key={hobby.id}
              className="flex flex-col items-center text-center max-w-2xl mx-auto p-8 gap-4"
            >
              <img
                src={hobby.picture}
                alt={hobby.name}
                className="w-64 h-64 rounded-xl object-cover"
              />
              <h2 className="text-3xl font-bold">{hobby.name}</h2>
              <p className="text-slate-300">{hobby.description}</p>
              <p className="italic text-slate-400">{hobby.reason}</p>
            </div>
          );
        }
      })}
    </div>
  );
}