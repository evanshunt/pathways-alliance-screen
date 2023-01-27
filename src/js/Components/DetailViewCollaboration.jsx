import { Html } from "@react-three/drei";

export default () => {
  return (
    <Html
      transform
      scale={0.2}
    >
      <section className="detailview">
        <div className="content">
          <div className="text">
            <h2>Climate change means we all need to change</h2>
            <p>Canada's oil sands have a shared goal: net-zero by 2050. But no company can get there alone.</p>
            <p>Pathways Alliance is a team-up of Canada's six largest oil sands producers. Our companies make up 95% of Canada's oil sands industry. Together, we can go farther, faster.</p>
            <p>We're also working with provincial and federal governments to help Canada meet its Paris Climate Agreement goals. By 2030, our plan could reduce absolute CO2 emissions from oil sands by 22 million tonnes per year.</p>
          </div>
          <div className="illustration">
          </div>
        </div>
      </section>
    </Html>
  )
}