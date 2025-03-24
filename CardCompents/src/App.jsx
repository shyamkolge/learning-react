import Avatar from "./components/Avatar";
import Introduction from "./components/Introduction";
import SkillList from "./components/SkillList";

export default function App() {
  return (
    <section className="card">
      <Avatar />
      <Introduction />
      <SkillList />
    </section>
  );
}
