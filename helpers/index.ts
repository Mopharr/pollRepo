export const shuffleArray = <T>(array: T[]): T[] => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};

export const textEditorConfig = {
  placeholderText: "Edit Your Content Here!",
  charCounterCount: false,
  toolbarButtons: [
    "bold",
    "italic",
    "underline",
    "|",
    "insertImage",
    "insertLink",
    "insertVideo",
    "formatOL",
    "formatUL",
    "paragraphFormat",
    "align",
    "formatOLSimple",
    "color",
    "undo",
    "redo",
    "clearFormatting",
    // Add more buttons as needed
  ],
  imageUpload: true,

  videoUpload: true,
  videoUploadURL: "/upload_video", // Replace with your video upload URL
  videoUploadParams: { id: "my_editor" }, // Additional params if needed
  videoUploadMethod: "POST",
  videoMaxSize: 50 * 1024 * 1024, // Set max video size (e.g., 50MB)
  videoAllowedTypes: ["mp4", "webm", "ogg"],
  attribution: false,
  toolbarBottom: true,
  linkAlwaysBlank: true, // Opens links in a new tab
  linkEditButtons: ["linkOpen", "linkEdit", "linkRemove"], // Link edit options
  paragraphFormat: {
    N: "Normal",
    H1: "Heading 1",
    H2: "Heading 2",
    H3: "Heading 3",
    // Add more formats as needed
  },
  // Add more configuration options as needed
};

export const textEditorOptionConfig = {
  // ...textEditorConfig,
  toolbarInline: true,

  heightMin: 40, // Set minimum height similar to a text input

  placeholderText: "Add Opinion",
};

// export type SvgIconProps = Omit<React.SVGProps<SVGSVGElement>, 'as'> & {
//   as: React.ElementType<React.SVGProps<SVGSVGElement>>;
// };

// const SvgIcon: React.FC<SvgIconProps> = (props) => {
//   const { as: SvgComponent, ...rest } = props;
//   return <SvgComponent {...rest} width={18} height={18} color="red" />;
// };

export interface Data {
  [key: string]: any;
}

export const extractValidFormData = (formData: Data): Data => {
  const validFormData: Data = {};

  for (const key in formData) {
    if (
      formData.hasOwnProperty(key) &&
      formData[key] &&
      formData[key]?.length > 0
    ) {
      validFormData[key] = formData[key];
    }
  }

  return validFormData;
};

export const extractValidProfileData = (formData: Data): Data => {
  const validProfileData: Data = {};

  for (const key in formData) {
    if (formData.hasOwnProperty(key) && formData[key]) {
      validProfileData[key] = formData[key];
    }
  }

  return validProfileData;
};
