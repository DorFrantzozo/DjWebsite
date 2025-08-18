import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const About = ({ profile }) => {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="text-2xl text-white">About me</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-white/80 md:text-2xl leading-relaxed">
          {profile.about}
        </p>
      </CardContent>
    </Card>
  );
};

export default About;
