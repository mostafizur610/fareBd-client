import ConfirmationModal from "@/Components/Shared/ConfirmationModal/ConfirmationModal";
import { AuthContext } from "@/Contexts/AuthProvider/AuthProvider";
import { Button, Table } from "flowbite-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import DashboardSideBar from '../DashboardSideBar/DashboardSideBar';

const AllWishList = () => {
  const [refetch, setRefetch] = useState(false);
  const [wishlistPosts, setWishlistPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [deleteData, setDeleteData] = useState(null);

  useEffect(() => {
    fetch(`https://server-fare-bd.vercel.app/wishlist`)
      .then(res => res.json())
      .then(data => {
        setWishlistPosts(data);
      })
  }, [refetch])

  const handleDeletePost = post => {
    fetch(`https://server-fare-bd.vercel.app/mywishlist/${post?.propertyId}?email=${user?.email}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, post);
        if (data.deletedCount > 0) {
          setDeleteData(false)
          toast.success("Property deleted successfully from wishlist!")
          setRefetch(!refetch)
        }
      })
      .catch((err) => {
        // console.log(err);
        setDeleteData(null);
        toast.error("Something went wrong!")
      });
  }

  const onClose = () => {
    setDeleteData(null)
  }

  // console.log(wishlistPosts);
  return (
    <div className='flex'>
      <DashboardSideBar></DashboardSideBar>
      <div className="mx-auto flex-grow overflow-x-auto">
        <h2 className='title uppercase p-10 text-center mb-10 bg-secondary text-white text-2xl font-semibold'>All Wishlist </h2>

        <Table striped={true}>
          <Table.Head>
            <Table.HeadCell>
              #
            </Table.HeadCell>
            <Table.HeadCell>
              Image
            </Table.HeadCell>
            <Table.HeadCell>
              Name
            </Table.HeadCell>
            <Table.HeadCell>
              Seller Name
            </Table.HeadCell>
            <Table.HeadCell>
              Seller Email
            </Table.HeadCell>
            <Table.HeadCell>
              Status
            </Table.HeadCell>
            <Table.HeadCell>
              Price
            </Table.HeadCell>
            <Table.HeadCell>
              Actions
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {
              wishlistPosts?.map((post, index) =>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell>
                    <img src={post.propertyPicture} className="h-12 w-16" alt="" />
                  </Table.Cell>
                  <Table.Cell>
                    {post.propertyName}
                  </Table.Cell>
                  <Table.Cell>
                    {post.sellerName}
                  </Table.Cell>
                  <Table.Cell>
                    {post.sellerEmail}
                  </Table.Cell>
                  <Table.Cell>
                    {post.paid && post.transactionId ?
                      <span className="border p-1 rounded-md text-red-500">Sold</span>
                      :
                      <span className="border p-1 rounded-md text-secondary">Available</span>
                    }
                  </Table.Cell>
                  <Table.Cell>
                    ${post.propertyPrice}
                  </Table.Cell>
                  <Table.Cell className='flex gap-3' >

                    <Link href={`/singleproperty/${post.propertyId}`} ><Button size="xs">
                      <BiArrowToRight className='mr-2' size={16}></BiArrowToRight> {post.propertyCondition === "toRent" ? "Rent Now" : "Buy Now"}
                    </Button></Link>

                    <Button size="xs" color="failure" onClick={() => setDeleteData(post)}>
                      <FaTrash className='mr-2'></FaTrash> Remove
                    </Button>

                    {
                      // Delete Confirmation Modal
                      deleteData && <ConfirmationModal
                        message={`Are you sure to delete this post?`}
                        data={deleteData}
                        setData={setDeleteData}
                        successAction={handleDeletePost}
                        successActionName="Yes, I'm Sure!"
                        cancelActionName="No, Cancel"
                        successBtnColor="red"
                      />
                    }

                  </Table.Cell>
                </Table.Row>)
            }
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default AllWishList;