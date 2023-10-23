const Recipe = (props) => {
    function closeRecipe() {
        document.getElementById("recipeModal").style.display = "none";
    }

    function handleBackgroundClick(event) {
        if (event.target.id === "recipeModal") {
            closeRecipe();
        }
    }

    // 재료 정보 렌더링
    const ingredients = props.selectedRecipe?.ingredient
        ? JSON.parse(props.selectedRecipe.ingredient)
        : [];

    // 레시피 과정 렌더링
    const recipeSteps = props.selectedRecipe?.recipe
        ? JSON.parse(props.selectedRecipe.recipe)
        : [];

    // 중복된 숫자를 제거하고 순차적으로 다시 번호를 매깁니다
    const processedRecipeSteps = [];
    for (let i = 0; i < recipeSteps.length; i++) {
        if (i === 0 || recipeSteps[i] !== recipeSteps[i - 1]) {
            processedRecipeSteps.push(` ${recipeSteps[i]}`);
        } else {
            processedRecipeSteps.push(recipeSteps[i]);
        }
    }

    return (
        <div class="modal" id="recipeModal" style={{ display: props.selectedRecipe ? 'block' : 'none' }} onClick={handleBackgroundClick}>
            <div class="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
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
                                    <ul>
                                        {ingredients.map((item, index) => (
                                            <li key={index}>{item.trim()}</li>
                                        ))}
                                    </ul>
                                </div>
                                <br></br>
                                <div>
                                    <p>요리 과정 : </p>
                                    <ol>
                                        {processedRecipeSteps.map((step, index) => (
                                            <li key={index}>{step}</li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={closeRecipe}>Close</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Recipe;
