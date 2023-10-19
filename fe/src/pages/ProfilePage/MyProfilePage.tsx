import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Routes from "../../router/Routes";
import PortfoliosPage from "./PortfoliosPage";
import ProfileEditPage from "./ProfileEditPage";

export default function MyProfilePage() {
  const navigate = useNavigate();
  const { section } = useParams();
  const [selectedSection, setSelectedSection] = useState(section || "edit");

  const onChange = (_: React.MouseEvent<HTMLElement>, section: string) => {
    if (!section) return;

    setSelectedSection(section);
    navigate(`${Routes.PROFILE}/${section}`);
  };

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={selectedSection}
        exclusive
        onChange={onChange}
        aria-label="Platform">
        <ToggleButton value="edit">내 프로필</ToggleButton>
        <ToggleButton value="portfolios">내 포트폴리오</ToggleButton>
      </ToggleButtonGroup>

      {section === "edit" ? <ProfileEditPage /> : <PortfoliosPage />}
    </>
  );
}
