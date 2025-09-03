import { Users, Target, Award, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Users,
      title: "Customer First",
      description:
        "We prioritize our customers' needs and ensure their satisfaction is always our top priority.",
    },
    {
      icon: Target,
      title: "Reliability",
      description:
        "We provide accurate information and reliable services you can trust.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from listings to customer support.",
    },
    {
      icon: Heart,
      title: "Care",
      description:
        "We genuinely care about helping people find their perfect home.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-sky-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Flatzy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Flatzy is a student-led startup founded by{" "}
              <span className="font-semibold text-sky-600">
                Sarvadnya Bhoyar
              </span>
              , a Computer Science student at YCCE. Our mission is to make
              renting simple, transparent, and stress-free by connecting tenants
              with quality properties and providing support throughout the
              rental journey.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Flatzy was born in 2023 from the vision of{" "}
                  <span className="font-medium text-gray-900">
                    Sarvadnya Bhoyar
                  </span>
                  , who as a student himself, experienced the struggles of
                  finding quality rental properties. From confusing listings to
                  poor communication, the process often felt more stressful than
                  exciting.
                </p>
                <p>
                  Determined to solve this problem, he decided to build a
                  platform that focuses on{" "}
                  <span className="text-sky-600 font-medium">
                    verified listings, user trust, and customer-first support
                  </span>
                  . What started as a college project has now grown into a
                  startup helping people across India find homes more easily and
                  confidently.
                </p>
                <p>
                  Our story is one of passion, innovation, and the belief that
                  technology can make the rental experience smoother, safer, and
                  more reliable for everyone.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Our team"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-4">
                    <IconComponent className="w-8 h-8 text-sky-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our mission is to{" "}
              <span className="text-sky-600 font-medium">
                revolutionize the rental experience
              </span>{" "}
              by providing a transparent, reliable, and user-friendly platform
              that connects people with their perfect homes. As a startup built
              by a{" "}
              <span className="font-semibold text-gray-900">
                Computer Science student from YCCE
              </span>
              , we are driven by innovation, fresh ideas, and the passion to
              solve real problems. We’re committed to building trust, fostering
              community, and making quality housing accessible to everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
