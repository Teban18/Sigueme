
var checkForProjects = function() {
    projectRecieverRule('project')
}

var renderProjects = (name,address) => {
    const data = `
    <div class="col s12 m6">
        <div class="card" style="border-radius:20px;">
        <div class="card-image">
            <img src="../assets/images/donationimage.PNG" id="donationimage" alt="donation"></img>
            <a id="${address}" href="javascript:;" class="btnpro">Donar</a>
        </div>
            <div class="card-content white-text">
            <h4 class="card-title blue-grey-text">${name}</h4>
            <p  class="card-title grey-text">Esta es una descripción de prueba</p>
            </div>
        </div>
    </div>
    `;
    stopping("loadspin")
    $("#projectpanel").append(data)
}
