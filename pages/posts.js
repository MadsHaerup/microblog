import { Layout } from '../sections/Layout';
import faunaQueries from '../lib/fauna';
import Card from '../components/Card';

const Posts = ({data}) => {
  return (
    <Layout>
      <section className="text-center pt-12 sm:pt-24 pb-16">
        <h1 className="text-4xl sm:text-7xl font-bold capitalize">
          blog posts
        </h1>
      </section>
      <div className="grid sm:grid-cols-2 gap-8 max-w-screen-lg mx-auto">
        {data.map(post => <Card key={post.id} {...post} />)}
      </div>
    </Layout>
    
  )
}

export async function getStaticProps(){
  try{
    const {data} = await faunaQueries.getPosts();

    return {
      props:{
        data
      }
    }
  } catch(error){
    return {
      props:{
        data: []
      }
    }
  }
}
export default Posts;