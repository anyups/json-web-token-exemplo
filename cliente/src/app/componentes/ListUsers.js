
export default async function ListUsers({users}) {
    await new Promise((resolve) => setTimeout(resolve, 60));
    return(
        <div>

            {users?.map((user, index) =>
            <p key={index}>
                {user.nome}
            </p>
            )}

        </div>
    );
}