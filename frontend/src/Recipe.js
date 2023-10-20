
const Recipe = (props) => {

    function closeRecipe() {
        document.getElementById("recipeModal").style.display = "none";
    }

    return (<div class="modal" id="recipeModal" style={{ display: props.selectedRecipe ? 'block' : 'none' }}>
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                {props.selectedRecipe && (
                    <>
                        <div class="modal-header">
                            <h5 class="modal-title">{props.selectedRecipe.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeRecipe}>
                                <span aria-hidden="true"></span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <p>재료 : </p>
                                {props.selectedRecipe.ingredient
                                    .substring(1, props.selectedRecipe.ingredient.length - 1) // 양끝의 대괄호 제거
                                    .split(',').map((item, index) => (
                                        <li key={index}>{item.trim()}</li>
                                    ))}
                            </div>
                            <br></br>
                            <div>
                                <p>요리 과정: </p>
                                {props.selectedRecipe.recipe
                                    .substring(1, props.selectedRecipe.recipe.length - 1) // 양끝의 대괄호 제거
                                    .split('","').map((step, index) => (
                                        <p key={index}>{`${index + 1}. ${step}`}</p>
                                    ))}
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={closeRecipe}>Close</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>)
}

export default Recipe;