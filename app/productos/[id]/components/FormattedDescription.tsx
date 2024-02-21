import { formattedText } from "@/app/utilities/formattedText";
import { Typography } from "@mui/material";

type Props = { text: string };
export default function FormattedDescription({ text }: Props) {
  return (
    <ul className="w-full overflow-y-auto">
      {formattedText(text)?.map((linea, index) => (
        <li key={index} className="mb-1">
          <Typography variant="body2" color="text.secondary">
            {linea}
          </Typography>
        </li>
      ))}
    </ul>
  );
}
