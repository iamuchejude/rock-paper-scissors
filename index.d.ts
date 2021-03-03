declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

interface ImportMeta {
  hot: any;
}

declare module 'feather-icons-react';
