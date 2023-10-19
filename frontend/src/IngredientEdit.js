
const IngredientEdit = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/" style={{ marginLeft: 300 }}>Recipe App</a>
                </div>
                <ul class="navbar-nav" style={{ marginRight: 300 }}>
                    <li class="nav-item" style={{ width: 100, textAlign: 'center' }}>
                        <a class="nav-link" href="/">메인화면</a>
                    </li>
                </ul>
            </nav>
            <div>
                <form style={{ marginLeft: 300, marginRight: 300 }} onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>재료수정</legend>
                        <div class="form-group">
                            <label for="exampleInputPassword1" class="form-label mt-1">이름</label>
                            <input
                                type="text"
                                class="form-control w-100"
                                id="exampleInputPassword1"
                                placeholder="이름"
                                autocomplete="off"
                                name="name" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1" class="form-label mt-1">개수</label>
                            <input
                                type="text"
                                class="form-control w-100"
                                id="exampleInputPassword1"
                                placeholder="개수"
                                autocomplete="off"
                                name="count" />
                        </div>
                        <div class="form-group" style={{ width: 100 }}>
                            <label for="exampleInputPassword1" class="form-label mt-4">유통기한</label>
                            <DatePicker selected={startDate} onChange={date => setStartDate(date)} name="date" />
                        </div>
                        <button type="submit" class="btn btn-primary mt-3 me-2">Submit</button>
                        <button type="button" class="btn btn-primary mt-3">Cancel</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default IngredientEdit;