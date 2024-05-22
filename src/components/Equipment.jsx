import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import "../styles/sty.css";

const equipmentList = [
  { title: "Treadmill", description: "A machine for running or walking in place, adjustable for speed and incline." },
  { title: "Elliptical", description: "Low-impact cardio machine simulating stair climbing, walking, or running." },
  { title: "Spinning Bike", description: "Stationary bike designed for high-intensity indoor cycling workouts." },
  { title: "Air Rower", description: "Rowing machine using air resistance to simulate rowing on water." },
  { title: "Air Bike", description: "Cardio equipment combining arms and legs movement with air resistance." },
  { title: "Vertical Chest Press", description: "Machine targeting the chest muscles with a vertical pressing motion." },
  { title: "Pec Fly/Rear Delt", description: "Dual-function machine for chest flyes and rear delt exercises." },
  { title: "Multi Functional Station", description: "Versatile unit offering various strength training exercises." },
  { title: "Multi Press", description: "Adjustable machine for performing multiple press exercises." },
  { title: "Standing Fly / Deltoids", description: "Machine for isolating and working the deltoid muscles." },
  { title: "Flat/Incline Bench", description: "Adjustable bench for various pressing and support exercises." },
  { title: "Power Bench", description: "Sturdy bench designed for heavy lifting and support." },
  { title: "Half Rack", description: "Versatile rack for squats, bench press, and other barbell exercises." },
  { title: "Smith Machine Counter Balanced", description: "Assisted barbell machine for guided weightlifting." },
  { title: "Power Squat", description: "Machine focused on performing squats with added stability and resistance." },
  { title: "45° Leg Press", description: "Leg press machine set at a 45-degree angle for lower body workouts." },
  { title: "Leg Curl/Extension", description: "Machine for targeting hamstrings with curls and quadriceps with extensions." },
  { title: "Adductor/Abductor", description: "Machine to strengthen inner (adductor) and outer (abductor) thigh muscles." },
  { title: "Preacher Curl Bench", description: "Bench designed to isolate and target the bicep muscles." },
  { title: "Back Extension", description: "Equipment for strengthening the lower back through hyperextension exercises." },
  { title: "Abdominal Board", description: "Adjustable board for performing various abdominal exercises." },
  { title: "Pull Over", description: "Machine focusing on latissimus dorsi and pectoral muscles with a pulling motion." },
  { title: "Isolateral Row", description: "Machine allowing independent rowing motion for each arm, targeting back muscles." },
  { title: "Multi Angled T-Bar", description: "Rowing equipment with multiple grip options for back workouts." },
  { title: "Wrist Curl", description: "Bench or machine for isolating and strengthening the forearm muscles." },
  { title: "Lat Pull Down with Rowing", description: "Dual-function machine for lat pulldowns and seated rows." },
  { title: "Assisted Dip Chin", description: "Machine providing assistance for performing dips and chin-ups." },
  { title: "Dumbbells (2.5 kg to 35 kg)", description: "Free weights available in various increments for strength training." },
];

const Equipment = ({ title, description }) => (
  <div className="w-full md:w-1/2 lg:w-1/4 p-4 flex flex-col">
    <div className="flex items-center mb-4">
      <div className="bg-70AB0E-800 p-3 rounded-full mr-4 border-2 border-black">
        <FontAwesomeIcon
          icon={faDumbbell}
          className="text-black text-lg"
          style={{ transform: "rotate(45deg)" }}
        />
      </div>
      <div
        className="text-black text-2xl"
        style={{ fontFamily: "Norwester", letterSpacing: "1px" }}
      >
        {title}
      </div>
    </div>
    <p className="text-black text-xl text-justify flex">
      {description}
    </p>
  </div>
);

const EquipmentGrid = () => (
  <div className="container mx-auto px-4 py-10">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {equipmentList.map((item, index) => (
        <Equipment
          key={index}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  </div>
);

export default EquipmentGrid;
