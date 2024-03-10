import { useRouter } from 'next/router';

const SpecialMenuComponent = () => {
  const router = useRouter();

  return (
    <div className="special_menu">
      <ul>
        <li>
          <a
            onClick={() => {
              router.push('/dashboard');
            }}
          >
            대시보드
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              router.push('/form');
            }}
          >
            폼
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SpecialMenuComponent;
