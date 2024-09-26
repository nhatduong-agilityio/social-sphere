import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';

// Constants
import { ROUTER } from '@/constants/router';

// Components
import { ChevronRightIcon } from '@/icons';
import { CategoryDetail, CategoryDetailSkeleton } from '@/ui/category';

export const metadata: Metadata = {
  title: 'Category Detail',
};

const CategoryDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return (
    <main className="">
      <div className="px-6">
        <Link
          href={ROUTER.CATEGORY}
          title="Category List"
          className="flex items-center text-blue-500 hover:text-blue-800 mb-4"
        >
          <ChevronRightIcon customClass="w-6 h-6 rotate-180" />
          Category List
        </Link>

        <Suspense
          key={`${ROUTER.CATEGORY}/${id}`}
          fallback={<CategoryDetailSkeleton />}
        >
          <CategoryDetail id={id} />
        </Suspense>
      </div>
    </main>
  );
};

export default CategoryDetailPage;
