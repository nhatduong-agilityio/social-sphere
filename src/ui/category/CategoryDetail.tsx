import { notFound } from 'next/navigation';
import Image from 'next/image';

// API
import { getCategoryById } from '@/api/category';

// Utils
import { isNotFound } from '@/utils/api';

type CategoryDetailProps = {
  id: string;
};

export const CategoryDetail = async ({ id }: CategoryDetailProps) => {
  const category = await getCategoryById(id);

  if (isNotFound(category)) {
    notFound();
  }

  const { name, img } = category;

  return (
    <div className="grid grid-cols-[160px_1fr]">
      <div className="text-center">
        <h2 className="font-semibold text-lg uppercase">{name}</h2>
        {img && (
          <Image
            className="mx-auto rounded-lg"
            src={img}
            width={90}
            height={90}
            alt={name}
          />
        )}
      </div>
      <div>
        <h1 className="font-bold text-center text-lg mb-4">{name}</h1>
      </div>
    </div>
  );
};
