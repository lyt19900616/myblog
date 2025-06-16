
import CategoryAdd from '@/components/category/CategoryAdd';
import { fetchCategories } from '@/prisma/query/category';

export default async function page() {
  const categories = await fetchCategories();
  return (
    <div>
      <div className='flex justify-between items-center py-4'>
      <h1 className='text-2xl font-bold p-2'>分类</h1>
      <CategoryAdd />
      </div>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
        {
          categories.map(category => 
          (<div className="border border-gray-300 rounded-md p-4 flex flex-col gap-4 cursor-pointer" key={category.id}>
            <h1 className=' font-bold'>{category.name}</h1>
            <p className='text-gray-500 text-sm'>{category.description}</p>
          </div>)
          )
        }
      </div>
    </div>
  )
}
