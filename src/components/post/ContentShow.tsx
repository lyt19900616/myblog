'use client';
import 'react-quill-new/dist/quill.snow.css';

export default function ContentShow({ content }: { content: string }) {
  return (
    <div className="ql-container ql-snow max-w-none mb-6">
      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
