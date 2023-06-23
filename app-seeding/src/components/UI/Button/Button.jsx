import buttonStyles from './Button.module.scss';

export default function Button({ children, event, icon, color }) {
  return (
    <button
      className={`${buttonStyles['button']} ${color && color === 'red' ? buttonStyles['red'] : ''} btn`}
      onClick={event}
    >
      {!icon ? null : (
        <span
          className={buttonStyles['button__icon']}
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${icon})` }}
        ></span>
      )}
      <span>{children}</span>
    </button>
  );
}
