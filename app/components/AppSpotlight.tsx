import { Spotlight } from "@mantine/spotlight";
import { useNavigate } from "react-router";

export const AppSpotlight = () => {
    const navigate = useNavigate();

    return (
        <Spotlight
            actions={[
                {
                    id: "home",
                    label: "Home",
                    onClick: () => navigate("/"),
                },
                {
                    id: "string-length",
                    label: "String Length Tool",
                    onClick: () => navigate("/string-length"),
                },
                {
                    id: "uuidv4",
                    label: "Generate UUIDv4",
                    onClick: () => navigate("/generate-uuid-v4"),
                },
                {
                    id: "video-to-gif",
                    label: "Video To GIF",
                    onClick: () => navigate("/video-to-gif"),
                },
            ]}
        />
    )
};
