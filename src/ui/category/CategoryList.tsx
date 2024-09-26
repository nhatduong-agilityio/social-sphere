// API
import { getCategoryList } from '@/api/category';

// Models
import { ROUTER } from '@/constants/router';
import { CategoryModel } from '@/models/CategoryModel';

// Components
import Image from 'next/image';
import Link from 'next/link';

const CategoryRow = ({ id, name, img }: CategoryModel) => (
  <Link
    href={`${ROUTER.CATEGORY}/${id}`}
    title={name}
    className="block border-b mb-1 py-1 flex gap-2 items-center hover:bg-slate-50"
  >
    <div className="w-12 h-9 bg-slate-300 rounded-lg">
      {img && (
        <Image
          className="rounded-lg"
          src={img}
          width={48}
          height={36}
          alt={name}
        />
      )}
    </div>
    <div>
      <h2 className="font-bold">{name}</h2>
    </div>
  </Link>
);

type CategoryListProps = {
  showError?: boolean;
};

export const CategoryList = async ({ showError }: CategoryListProps) => {
  const categories = await getCategoryList(showError);

  return (
    <>
      {categories.map(({ id, name, slug, img }) => (
        <CategoryRow id={id} key={id} name={name} slug={slug} img={img} />
      ))}
    </>
  );
};
