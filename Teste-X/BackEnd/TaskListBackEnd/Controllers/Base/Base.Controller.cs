namespace Task_List_Backend.Controllers.Base
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseController<T, R, D, C> : ControllerBase
        where T : BaseModel
        where R : IRepositoryContract<T>
        where D : class
        where C : class
    {
        private readonly ILogger<C> _logger;
        private readonly R _repository;
        private readonly IMapper _mapper;

        public BaseController(ILogger<C> logger, R repository, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        [ResponseCache(VaryByHeader = "User-Agent", Duration = 3, Location = ResponseCacheLocation.Client)]
        public virtual async Task<ActionResult<IEnumerable<D>>> GetAll()
        {
            var entities = await _repository.GetAll();
            if (entities == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<IEnumerable<T>, IEnumerable<D>>(entities));
        }

        [HttpGet("{id}")]
        [ResponseCache(VaryByHeader = "User-Agent", Duration = 3, Location = ResponseCacheLocation.Client)]
        public virtual async Task<ActionResult<D>> Get(int id)
        {
            var entity = await _repository.GetById(id);
            if (entity == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<D>(entity));
        }

        [HttpPut("{id}")]
        public virtual async Task<ActionResult<D>> Put(int id, D entityDTO)
        {
            var entity = _mapper.Map<T>(entityDTO);
            entity.Id = id;

            try
            {
                var updatedEntity = await _repository.Update(id, entity);
                return Ok(_mapper.Map<D>(updatedEntity));
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_repository.Exists(id))
                {
                    return NotFound();
                }

                throw;
            }
        }

        [HttpPost]
        public virtual async Task<ActionResult<D>> Post(D entityDTO)
        {
            var entity = _mapper.Map<T>(entityDTO);

            await _repository.Create(entity);
            return CreatedAtAction(nameof(Post), new { id = entity.Id }, _mapper.Map<D>(entity));
        }

        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete(int id)
        {
            var entity = await _repository.GetById(id);
            if (entity == null)
            {
                return NotFound();
            }

            _repository.Delete(id);
            return NoContent();
        }
    }
}