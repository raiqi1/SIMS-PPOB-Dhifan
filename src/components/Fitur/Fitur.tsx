import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Feature {
  name?: string;
  image?: string;
  code?: string;
  tariff?: number;
  loader?: boolean;
}

interface Features {
  features: {
    service_name: string;
    service_icon: string;
    service_code: string;
    service_tariff: number;
  }[];
  loader?: boolean;
}

const FeatureCard = ({ name, image, code, tariff, loader }: Feature) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!loader) {
      navigate(`/pembelian/${code}`, {
        state: {
          service_name: name,
          service_icon: image,
          service_code: code,
          service_tariff: tariff,
        },
      });
    }
  };

  return (
    <div
      className={`cursor-pointer ${loader ? "pointer-events-none" : ""}`}
      onClick={handleNavigate}
    >
      <div className={`p-1 text-white flex justify-center`}>
        <div className={`p-1 rounded-md text-white w-fit`}>
          {loader ? (
            <Skeleton circle={true} height={48} width={48} />
          ) : (
            <img src={image} alt={name} className="h-12 w-12 rounded-full" />
          )}
        </div>
      </div>
      <div className="mt-2 w-20 text-sm text-center leading-4">
        {loader ? <Skeleton width={80} height={16} /> : name}
      </div>
    </div>
  );
};

const FeatureList = ({ features, loader }: Features) => {
  const skeletonArray = Array.from({ length: 12 });

  return (
    <div className="mt-10 flex flex-wrap gap-4">
      {loader
        ? skeletonArray.map((_, index) => (
            <FeatureCard key={index} loader={true} />
          ))
        : features.map((feature, index) => (
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
