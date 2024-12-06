import { useNavigate } from "react-router-dom";

interface Feature {
  name: string;
  image: string;
  background?: string;
  code: string;
  tariff?: number;
}

interface Features {
  features: {
    service_name: string;
    service_icon: string;
    service_code: string;
    service_tariff: number;
  }[];
}

const FeatureCard = ({ name, image, code, tariff }: Feature) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/pembelian/${code}`, {
      state: {
        service_name: name,
        service_icon: image,
        service_code: code,
        service_tariff: tariff,
      },
    });
  };

  return (
    <div className="cursor-pointer" onClick={handleNavigate}>
      <div className={`p-1  text-white flex justify-center`}>
        <div className={`p-1 rounded-md  text-white w-fit`}>
          <img src={image} alt={name} className="h-12 w-12 rounded-full" />
        </div>
      </div>
      <div className="mt-2 w-20 text-sm text-center leading-4">{name}</div>
    </div>
  );
};

const FeatureList = ({ features }: Features) => {
  return (
    <div className="mt-10 flex flex-wrap gap-4 ">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          name={feature.service_name}
          image={feature.service_icon}
          code={feature.service_code}
          tariff={feature.service_tariff}
        />
      ))}
    </div>
  );
};

export default FeatureList;
