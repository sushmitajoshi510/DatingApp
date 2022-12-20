using API.Interfaces;
using AutoMapper;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _contex;
        private readonly IMapper _mapper;
        public UnitOfWork(DataContext contex, IMapper mapper)
        {
            _mapper = mapper;
            _contex = contex;
            
        }
        public IUserRepository UserRepository => new UserRepository(_contex,_mapper);

        public IMessageRepository MessageRepository => new MessageRepository(_contex,_mapper);

        public ILikesRepository LikesRepository => new LikesRepository(_contex);

        public async Task<bool> Complete()
        {
            return await _contex.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _contex.ChangeTracker.HasChanges();
        }
    }
}