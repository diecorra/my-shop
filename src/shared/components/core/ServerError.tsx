export interface ServerErrorProps {
  message?: string;
}

export const ServerError = (props: ServerErrorProps) => {
  return (
    <div className="bg-red-500 text-white rounded-xl p-3 my-6">
      {props.message || 'A server error occurs!'}
    </div>
  );
};
